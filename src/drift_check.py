import urllib.error
import urllib.request


COMMUNITY_SOURCE = (
    "https://raw.githubusercontent.com/"
    "Makabeez/awesome-technocore/main/README.md"
)

TOOL_COUNT_SOURCE = (
    "https://policylayer.com/policies/technocore-chat"
)

OFFICIAL_SOURCE = (
    "https://raw.githubusercontent.com/"
    "flop-labs/technocore-chat/main/README.md"
)


def fetch_text(url):
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "technocore-drift-check/0.2",
            "Accept": "text/html,text/plain",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return response.read().decode("utf-8")
    except urllib.error.URLError as error:
        raise RuntimeError(f"Could not read source: {error}")


def check_mcp_presence_drift(community_text, official_text):
    old_claim_present = "no mcp server" in community_text.lower()
    official_mcp_present = "mcp server" in official_text.lower()

    if old_claim_present and official_mcp_present:
        return "STALE"

    if old_claim_present and not official_mcp_present:
        return "UNSUPPORTED"

    return "INCONCLUSIVE"


def check_mcp_tool_count_drift(external_text, official_text):
    old_count_present = (
        "9 tools total" in external_text.lower()
        or "9 tools" in external_text.lower()
    )

    current_count_present = (
        "thirteen tools" in official_text.lower()
        or "13 tools" in official_text.lower()
    )

    if old_count_present and current_count_present:
        return "STALE"

    if old_count_present and not current_count_present:
        return "UNSUPPORTED"

    return "INCONCLUSIVE"


def print_result(title, claim, verdict, source):
    print(title)
    print("-" * len(title))
    print(f"Claim:   {claim}")
    print(f"Verdict: {verdict}")
    print(f"Source:  {source}")
    print()


def main():
    try:
        community_text = fetch_text(COMMUNITY_SOURCE)
        tool_count_text = fetch_text(TOOL_COUNT_SOURCE)
        official_text = fetch_text(OFFICIAL_SOURCE)
    except RuntimeError as error:
        print(error)
        return

    mcp_presence_verdict = check_mcp_presence_drift(
        community_text,
        official_text,
    )

    tool_count_verdict = check_mcp_tool_count_drift(
        tool_count_text,
        official_text,
    )

    print()
    print("Technocore Drift Check")
    print("======================")
    print()

    print_result(
        "MCP availability",
        '"no MCP server"',
        mcp_presence_verdict,
        COMMUNITY_SOURCE,
    )

    print_result(
        "MCP tool count",
        '"Technocore MCP has 9 tools"',
        tool_count_verdict,
        TOOL_COUNT_SOURCE,
    )

    print("Official source:")
    print(OFFICIAL_SOURCE)


if __name__ == "__main__":
    main()