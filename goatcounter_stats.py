#!/usr/bin/env python3
"""
GoatCounter Analytics Terminal Viewer
Beautiful command-line interface for viewing website analytics
Auto-refreshes every hour to show live stats
"""

import requests
import json
from datetime import datetime, timedelta
import calendar
import sys
import time
import os
import argparse

# Configuration
API_TOKEN = "3b15bpssubrz1ug92thtujpfhx0qc0c7c0z86ox7i43pyv6ts"
SITE = "ryan-jing"
BASE_URL = f"https://{SITE}.goatcounter.com/api/v0"
REFRESH_INTERVAL = 3600  # Refresh every hour (in seconds)

# Colors using ANSI escape codes
class Colors:
    RESET = '\033[0m'
    BOLD = '\033[1m'
    DIM = '\033[2m'

    # Foreground colors
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'
    GRAY = '\033[90m'

    # Background colors for heatmap
    BG_BLACK = '\033[40m'
    BG_GREEN_DARK = '\033[42m'
    BG_GREEN = '\033[102m'
    BG_YELLOW = '\033[103m'
    BG_RED = '\033[101m'


def fetch_stats(start_date, end_date, debug=False):
    """Fetch statistics from GoatCounter API"""
    headers = {"Authorization": f"Bearer {API_TOKEN}"}

    try:
        # Use /stats/total endpoint - more reliable for daily stats
        response = requests.get(
            f"{BASE_URL}/stats/total",
            headers=headers,
            params={
                "start": start_date.strftime("%Y-%m-%d"),
                "end": end_date.strftime("%Y-%m-%d")
            }
        )
        response.raise_for_status()
        data = response.json()

        if debug:
            print(f"\n{Colors.YELLOW}DEBUG INFO:{Colors.RESET}")
            print(f"API URL: {BASE_URL}/stats/total")
            print(f"Date range: {start_date.strftime('%Y-%m-%d')} to {end_date.strftime('%Y-%m-%d')}")
            print(f"Response status: {response.status_code}")
            print(f"Raw response data:")
            print(json.dumps(data, indent=2))
            print(f"{Colors.YELLOW}{'─' * 50}{Colors.RESET}\n")

        return data
    except requests.exceptions.RequestException as e:
        print(f"{Colors.RED}Error fetching data: {e}{Colors.RESET}")
        sys.exit(1)


def fetch_stat_type(stat_type, start_date, end_date, debug=False):
    """Fetch specific stat type from GoatCounter API (toprefs, browsers, systems, locations, sizes)"""
    headers = {"Authorization": f"Bearer {API_TOKEN}"}

    try:
        response = requests.get(
            f"{BASE_URL}/stats/{stat_type}",
            headers=headers,
            params={
                "start": start_date.strftime("%Y-%m-%d"),
                "end": end_date.strftime("%Y-%m-%d")
            }
        )
        response.raise_for_status()
        data = response.json()

        if debug:
            print(f"\n{Colors.YELLOW}DEBUG INFO ({stat_type}):{Colors.RESET}")
            print(f"API URL: {BASE_URL}/stats/{stat_type}")
            print(f"Response status: {response.status_code}")
            print(f"Raw response data:")
            print(json.dumps(data, indent=2))
            print(f"{Colors.YELLOW}{'─' * 50}{Colors.RESET}\n")

        return data
    except requests.exceptions.RequestException as e:
        if debug:
            print(f"{Colors.RED}Error fetching {stat_type} data: {e}{Colors.RESET}")
        return None


def get_color_for_count(count, max_count):
    """Get color based on view count intensity"""
    if count == 0:
        return Colors.BG_BLACK, Colors.GRAY

    ratio = count / max_count if max_count > 0 else 0

    if ratio < 0.25:
        return Colors.BG_BLACK, Colors.GREEN
    elif ratio < 0.50:
        return Colors.BG_BLACK, Colors.CYAN
    elif ratio < 0.75:
        return Colors.BG_BLACK, Colors.YELLOW
    else:
        return Colors.BG_BLACK, Colors.RED


def display_monthly_calendar(stats_data):
    """Display a calendar heatmap for the current month"""
    # Process data to get daily counts from /stats/total response
    daily_counts = {}
    if 'stats' in stats_data:
        for day_stat in stats_data['stats']:
            date = day_stat['day']
            count = day_stat.get('daily', 0)
            daily_counts[date] = count

    # Get current month
    now = datetime.now()
    year = now.year
    month = now.month

    # Calculate max for color scaling
    max_count = max(daily_counts.values()) if daily_counts else 1

    # Get calendar for the month
    cal = calendar.monthcalendar(year, month)
    month_name = calendar.month_name[month]

    print(f"{Colors.BOLD}{month_name} {year}{Colors.RESET}")

    # Print day headers
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    print("  ".join([f"{Colors.BOLD}{day}{Colors.RESET}" for day in days]))

    # Print calendar grid
    for week in cal:
        week_str = []
        for day in week:
            if day == 0:
                week_str.append("    ")  # Empty day
            else:
                date_str = f"{year}-{month:02d}-{day:02d}"
                count = daily_counts.get(date_str, 0)
                bg_color, fg_color = get_color_for_count(count, max_count)

                # Highlight today
                if day == now.day:
                    week_str.append(f"{bg_color}{fg_color}{Colors.BOLD} {day:2d} {Colors.RESET}")
                else:
                    week_str.append(f"{bg_color}{fg_color} {day:2d} {Colors.RESET}")

        print("  ".join(week_str))

    # Print legend (commented out for space)
    # print(f"\n{Colors.BOLD}Legend:{Colors.RESET}")
    # print(f"  {Colors.GRAY}■{Colors.RESET} 0 views")
    # print(f"  {Colors.GREEN}■{Colors.RESET} Low (1-25%)")
    # print(f"  {Colors.CYAN}■{Colors.RESET} Medium (25-50%)")
    # print(f"  {Colors.YELLOW}■{Colors.RESET} High (50-75%)")
    # print(f"  {Colors.RED}■{Colors.RESET} Very High (75-100%)")

    # Print monthly total
    total = stats_data.get('total', 0)
    print(f"{Colors.BOLD}Month total: {Colors.GREEN}{total}{Colors.RESET}")


def display_summary(stats_data):
    """Display overall summary statistics"""
    # Process data to get daily counts from /stats/total response
    daily_counts = {}
    if 'stats' in stats_data:
        for day_stat in stats_data['stats']:
            date = day_stat['day']
            count = day_stat.get('daily', 0)
            daily_counts[date] = count

    # Get past 3 days
    now = datetime.now()
    today = now.strftime("%Y-%m-%d")
    yesterday = (now - timedelta(days=1)).strftime("%Y-%m-%d")
    two_days_ago = (now - timedelta(days=2)).strftime("%Y-%m-%d")

    today_count = daily_counts.get(today, 0)
    yesterday_count = daily_counts.get(yesterday, 0)
    two_days_count = daily_counts.get(two_days_ago, 0)

    # Get totals
    total = stats_data.get('total', 0)

    # Get date range
    start_date = now.replace(day=1)
    days_in_period = (now - start_date).days + 1
    avg_per_day = total / days_in_period if days_in_period > 0 else 0

    print(f"{Colors.BOLD}Total: {Colors.GREEN}{total}{Colors.RESET} | {Colors.BOLD}Avg/day: {Colors.CYAN}{avg_per_day:.1f}{Colors.RESET}")
    print(f"{Colors.BOLD}Today: {Colors.GREEN}{today_count}{Colors.RESET} | Yesterday: {Colors.CYAN}{yesterday_count}{Colors.RESET} | {(now - timedelta(days=2)).strftime('%a')}: {Colors.CYAN}{two_days_count}{Colors.RESET}")


def display_stat_table(title, data, max_items=5):
    """Display a generic stat table with percentages"""
    if not data or 'stats' not in data:
        print(f"{Colors.BOLD}{title}{Colors.RESET}")
        print(f"{Colors.DIM}Nothing to display{Colors.RESET}")
        return

    stats = data['stats']
    total_count = sum(item.get('count', 0) for item in stats)

    if total_count == 0:
        print(f"{Colors.BOLD}{title}{Colors.RESET}")
        print(f"{Colors.DIM}Nothing to display{Colors.RESET}")
        return

    print(f"{Colors.BOLD}{title}{Colors.RESET}")

    # Show top N items
    for item in stats[:max_items]:
        name = item.get('name', '(unknown)')
        # Handle empty names (common for referrers with no referrer)
        if not name or name.strip() == '':
            name = '(unknown)'
        count = item.get('count', 0)
        percentage = (count / total_count * 100) if total_count > 0 else 0

        # Create a thin horizontal line bar
        bar_length = 10
        filled = int(percentage / 100 * bar_length)
        empty = bar_length - filled
        bar = f"{Colors.GREEN}{Colors.BOLD}{'━' * filled}{Colors.RESET}{Colors.DIM}{'─' * empty}{Colors.RESET}"

        print(f"{percentage:5.1f}% {bar} {name} {Colors.DIM}{count}{Colors.RESET}")


def display_referrers(data):
    """Display top referrers"""
    display_stat_table("Top Referrers", data, max_items=5)


def display_browsers(data):
    """Display browser statistics"""
    display_stat_table("Browsers", data, max_items=5)


def display_systems(data):
    """Display operating system statistics"""
    display_stat_table("Systems", data, max_items=5)


def display_locations(data):
    """Display location statistics"""
    display_stat_table("Locations", data, max_items=5)


def display_sizes(data):
    """Display screen size statistics"""
    if not data or 'stats' not in data:
        print(f"{Colors.BOLD}Sizes{Colors.RESET}")
        print(f"{Colors.DIM}Nothing to display{Colors.RESET}")
        return

    stats = data['stats']
    total_count = sum(item.get('count', 0) for item in stats)

    if total_count == 0:
        print(f"{Colors.BOLD}Sizes{Colors.RESET}")
        print(f"{Colors.DIM}Nothing to display{Colors.RESET}")
        return

    print(f"{Colors.BOLD}Sizes{Colors.RESET}")

    # Size categories mapping
    size_labels = {
        'phone': 'Phones',
        'tablet': 'Tablets',
        'desktop': 'Computer',
        'desktophd': '> HD',
        'unknown': 'Other'
    }

    for item in stats:
        # Use 'id' field for size category (API returns empty 'name' field)
        size_id = item.get('id', 'unknown')
        label = size_labels.get(size_id, size_id)
        count = item.get('count', 0)
        percentage = (count / total_count * 100) if total_count > 0 else 0

        # Create a thin horizontal line bar
        bar_length = 10
        filled = int(percentage / 100 * bar_length)
        empty = bar_length - filled
        bar = f"{Colors.GREEN}{Colors.BOLD}{'━' * filled}{Colors.RESET}{Colors.DIM}{'─' * empty}{Colors.RESET}"

        print(f"{percentage:5.1f}% {bar} {label} {Colors.DIM}{count}{Colors.RESET}")


def clear_screen():
    """Clear the terminal screen"""
    os.system('clear' if os.name != 'nt' else 'cls')


def display_dashboard(refresh_interval=REFRESH_INTERVAL, show_next_update=True, debug=False):
    """Display the complete analytics dashboard"""
    clear_screen()

    # Fetch data for current month
    # Add 1 day to end_date to ensure we get today's data (timezone safety)
    now = datetime.now()
    start_date = now.replace(day=1)
    end_date = now + timedelta(days=1)  # Request one day ahead to ensure we get today

    stats_data = fetch_stats(start_date, end_date, debug=debug)

    # Fetch additional stats
    referrers_data = fetch_stat_type('toprefs', start_date, end_date, debug=debug)
    browsers_data = fetch_stat_type('browsers', start_date, end_date, debug=debug)
    systems_data = fetch_stat_type('systems', start_date, end_date, debug=debug)
    locations_data = fetch_stat_type('locations', start_date, end_date, debug=debug)
    sizes_data = fetch_stat_type('sizes', start_date, end_date, debug=debug)

    # Display all views
    print(f"{Colors.BOLD}{Colors.DIM} ryan-jing.github.io{Colors.RESET}")
    print(f"{Colors.DIM}{'─' * 42}{Colors.RESET}")
    display_monthly_calendar(stats_data)
    print(f"{Colors.DIM}{'─' * 42}{Colors.RESET}")

    # Display additional stats
    display_referrers(referrers_data)
    print()
    display_browsers(browsers_data)
    print()
    display_systems(systems_data)
    print()
    display_locations(locations_data)
    print()
    display_sizes(sizes_data)
    print(f"{Colors.DIM}{'─' * 42}{Colors.RESET}")
    display_summary(stats_data)

    if show_next_update:
        print(f"{Colors.GRAY}Next: {refresh_interval // 60}min | Ctrl+C to exit{Colors.RESET}")
    else:
        print(f"{Colors.GRAY}Updated: {now.strftime('%H:%M:%S')}{Colors.RESET}")


def main():
    """Main function - runs continuously with auto-refresh"""
    # Parse command line arguments
    parser = argparse.ArgumentParser(description='GoatCounter Analytics Dashboard')
    parser.add_argument('--once', action='store_true', help='Run once and exit (no auto-refresh)')
    parser.add_argument('--interval', type=int, help='Refresh interval in minutes (default: 60)')
    parser.add_argument('--debug', action='store_true', help='Show debug information including raw API response')
    args = parser.parse_args()

    # Set refresh interval
    refresh_interval = (args.interval * 60) if args.interval else REFRESH_INTERVAL

    try:
        if args.once:
            # Run once and exit
            display_dashboard(show_next_update=False, debug=args.debug)
        else:
            # Run continuously with auto-refresh
            while True:
                display_dashboard(refresh_interval=refresh_interval, show_next_update=True, debug=args.debug)
                if args.debug:
                    break  # Don't loop in debug mode
                time.sleep(refresh_interval)
    except KeyboardInterrupt:
        clear_screen()
        print(f"\n{Colors.GREEN}✓ GoatCounter Analytics stopped.{Colors.RESET}")
        print(f"{Colors.DIM}Thanks for using the analytics dashboard!{Colors.RESET}\n")
        sys.exit(0)
    except Exception as e:
        print(f"\n{Colors.RED}Error: {e}{Colors.RESET}\n")
        sys.exit(1)


if __name__ == "__main__":
    main()
