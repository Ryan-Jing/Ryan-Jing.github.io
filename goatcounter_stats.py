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
        # Try hits endpoint
        response = requests.get(
            f"{BASE_URL}/stats/hits",
            headers=headers,
            params={
                "start": start_date.strftime("%Y-%m-%d"),
                "end": end_date.strftime("%Y-%m-%d")
            }
        )
        response.raise_for_status()
        data = response.json()

        if debug:
            print(f"\n{Colors.YELLOW}DEBUG INFO - /stats/hits:{Colors.RESET}")
            print(f"API URL: {BASE_URL}/stats/hits")
            print(f"Date range: {start_date.strftime('%Y-%m-%d')} to {end_date.strftime('%Y-%m-%d')}")
            print(f"Response status: {response.status_code}")
            print(f"Raw response data:")
            print(json.dumps(data, indent=2))

            # Also try /stats/total endpoint
            print(f"\n{Colors.YELLOW}DEBUG INFO - /stats/total:{Colors.RESET}")
            response2 = requests.get(
                f"{BASE_URL}/stats/total",
                headers=headers,
                params={
                    "start": start_date.strftime("%Y-%m-%d"),
                    "end": end_date.strftime("%Y-%m-%d")
                }
            )
            print(f"Response status: {response2.status_code}")
            print(f"Raw response data:")
            print(json.dumps(response2.json(), indent=2))

            # Also try /stats/pages endpoint
            print(f"\n{Colors.YELLOW}DEBUG INFO - /stats/pages:{Colors.RESET}")
            response3 = requests.get(
                f"{BASE_URL}/stats/pages",
                headers=headers,
                params={
                    "start": start_date.strftime("%Y-%m-%d"),
                    "end": end_date.strftime("%Y-%m-%d")
                }
            )
            print(f"Response status: {response3.status_code}")
            print(f"Raw response data:")
            print(json.dumps(response3.json(), indent=2))
            print(f"{Colors.YELLOW}{'─' * 50}{Colors.RESET}\n")

        return data
    except requests.exceptions.RequestException as e:
        print(f"{Colors.RED}Error fetching data: {e}{Colors.RESET}")
        sys.exit(1)


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


# def print_header(title):
#     """Print a styled header"""
#     width = 70
#     print(f"\n{Colors.CYAN}{Colors.BOLD}{'=' * width}{Colors.RESET}")
#     print(f"{Colors.CYAN}{Colors.BOLD}{title.center(width)}{Colors.RESET}")
#     print(f"{Colors.CYAN}{Colors.BOLD}{'=' * width}{Colors.RESET}\n")


# def display_weekly_bar_chart(stats_data):
#     """Display a bar chart for the last 7 days"""
#     print_header("WEEKLY VIEWS - Last 7 Days")
#
#     # Process data to get daily counts
#     daily_counts = {}
#     if 'stats' in stats_data:
#         for stat in stats_data['stats']:
#             for day_data in stat.get('days', []):
#                 date = day_data[0][:10]  # Extract date part
#                 count = day_data[1]
#                 daily_counts[date] = daily_counts.get(date, 0) + count
#
#     # Get last 7 days
#     end_date = datetime.now()
#     dates = [(end_date - timedelta(days=i)).strftime("%Y-%m-%d") for i in range(6, -1, -1)]
#
#     # Calculate max for scaling
#     max_count = max([daily_counts.get(date, 0) for date in dates] + [1])
#
#     # Display bar chart
#     bar_width = 50
#     for date in dates:
#         count = daily_counts.get(date, 0)
#         bar_length = int((count / max_count) * bar_width) if max_count > 0 else 0
#
#         # Color based on count
#         _, color = get_color_for_count(count, max_count)
#
#         # Format date nicely
#         dt = datetime.strptime(date, "%Y-%m-%d")
#         day_name = dt.strftime("%a")
#         date_str = dt.strftime("%b %d")
#
#         bar = '█' * bar_length
#         print(f"{Colors.BOLD}{day_name} {date_str}{Colors.RESET} │ {color}{bar}{Colors.RESET} {Colors.BOLD}{count}{Colors.RESET} views")
#
#     total_week = sum([daily_counts.get(date, 0) for date in dates])
#     print(f"\n{Colors.BOLD}Total this week: {Colors.GREEN}{total_week}{Colors.RESET} views")


def display_monthly_calendar(stats_data):
    """Display a calendar heatmap for the current month"""
    # Process data to get daily counts
    daily_counts = {}
    if 'stats' in stats_data:
        for stat in stats_data['stats']:
            for day_data in stat.get('days', []):
                date = day_data[0][:10]
                count = day_data[1]
                daily_counts[date] = daily_counts.get(date, 0) + count

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

    # Print legend
    print(f"\n{Colors.BOLD}Legend:{Colors.RESET}")
    print(f"  {Colors.GRAY}■{Colors.RESET} 0 views")
    print(f"  {Colors.GREEN}■{Colors.RESET} Low (1-25%)")
    print(f"  {Colors.CYAN}■{Colors.RESET} Medium (25-50%)")
    print(f"  {Colors.YELLOW}■{Colors.RESET} High (50-75%)")
    print(f"  {Colors.RED}■{Colors.RESET} Very High (75-100%)")

    # Print monthly total
    monthly_total = sum([daily_counts.get(f"{year}-{month:02d}-{day:02d}", 0)
                        for week in cal for day in week if day != 0])
    print(f"{Colors.BOLD}Month total: {Colors.GREEN}{monthly_total}{Colors.RESET}")


def display_summary(stats_data):
    """Display overall summary statistics"""
    # Process data to get daily counts
    daily_counts = {}
    if 'stats' in stats_data:
        for stat in stats_data['stats']:
            for day_data in stat.get('days', []):
                date = day_data[0][:10]
                count = day_data[1]
                daily_counts[date] = daily_counts.get(date, 0) + count

    # Get past 3 days
    now = datetime.now()
    today = now.strftime("%Y-%m-%d")
    yesterday = (now - timedelta(days=1)).strftime("%Y-%m-%d")
    two_days_ago = (now - timedelta(days=2)).strftime("%Y-%m-%d")

    today_count = daily_counts.get(today, 0)
    yesterday_count = daily_counts.get(yesterday, 0)
    two_days_count = daily_counts.get(two_days_ago, 0)

    # Calculate totals
    total_hits = 0
    if 'stats' in stats_data:
        for stat in stats_data['stats']:
            total_hits += stat.get('count', 0)

    # Get date range
    end_date = now
    start_date = end_date.replace(day=1)  # Start of month

    days_in_period = (end_date - start_date).days + 1
    avg_per_day = total_hits / days_in_period if days_in_period > 0 else 0

    print(f"{Colors.BOLD}Total: {Colors.GREEN}{total_hits}{Colors.RESET} | {Colors.BOLD}Avg/day: {Colors.CYAN}{avg_per_day:.1f}{Colors.RESET}")
    print(f"{Colors.BOLD}Today: {Colors.GREEN}{today_count}{Colors.RESET} | Yesterday: {Colors.CYAN}{yesterday_count}{Colors.RESET} | {(now - timedelta(days=2)).strftime('%a')}: {Colors.CYAN}{two_days_count}{Colors.RESET}")


def clear_screen():
    """Clear the terminal screen"""
    os.system('clear' if os.name != 'nt' else 'cls')


def display_dashboard(refresh_interval=REFRESH_INTERVAL, show_next_update=True, debug=False):
    """Display the complete analytics dashboard"""
    clear_screen()

    # Fetch data for current month
    now = datetime.now()
    start_date = now.replace(day=1)
    end_date = now

    stats_data = fetch_stats(start_date, end_date, debug=debug)

    # Display all views
    print(f"{Colors.BOLD}{Colors.DIM} ryan-jing.github.io{Colors.RESET}")
    print(f"{Colors.DIM}{'─' * 42}{Colors.RESET}")
    display_monthly_calendar(stats_data)
    print(f"\n{Colors.DIM}{'─' * 42}{Colors.RESET}\n")
    display_summary(stats_data)
    print(f"\n{Colors.DIM}{'─' * 42}{Colors.RESET}\n")

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
