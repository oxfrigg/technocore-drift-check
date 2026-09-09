import urllib.error
import urllib.request


COMMUNITY_SOURCE = (
    "https://raw.githubusercontent.com/"
    "Makabeez/awesome-technocore/main/README.md"
)

OFFICIAL_SOURCE = (
    "https://raw.githubusercontent.com/"
    "flop-labs/technocore-chat/main/README.md"
)


def fetch_text(url):
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "technocore-drift-check/0.1",
            "Accept": "text/plain",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            return response.read().decode("utf-8")
    except urllib.error.URLError as error:
        raise RuntimeError(f"Could not read source: {error}")


def check_mcp_drift(community_text, official_text):
    old_claim_present = "no MCP server" in community_text
    official_mcp_present = "MCP server" in official_text

    if old_claim_present and official_mcp_present:
        return "STALE"

    if old_claim_present and not official_mcp_present:
        return "UNSUPPORTED"

    return "INCONCLUSIVE"


def main():
    try:
        community_text = fetch_text(COMMUNITY_SOURCE)
        official_text = fetch_text(OFFICIAL_SOURCE)
    except RuntimeError as error:
        print(error)
        return

    verdict = check_mcp_drift(
        community_text,
        official_text,
    )

    print()
    print("Technocore Drift Check")
    print("----------------------")
    print('Claim:   "no MCP server"')
    print(f"Verdict: {verdict}")
    print()
    print("Community source:")
    print(COMMUNITY_SOURCE)
    print()
    print("Official source:")
    print(OFFICIAL_SOURCE)


if __name__ == "__main__":
    main()