import sys
import unittest

sys.path.insert(0, "src")

from drift_check import check_mcp_drift


class TestMCPDrift(unittest.TestCase):

    def test_stale_claim(self):
        community = "there is no MCP server"
        official = "Technocore includes an MCP server"

        self.assertEqual(
            check_mcp_drift(community, official),
            "STALE",
        )

    def test_unsupported_claim(self):
        community = "there is no MCP server"
        official = "Technocore chat documentation"

        self.assertEqual(
            check_mcp_drift(community, official),
            "UNSUPPORTED",
        )

    def test_inconclusive(self):
        community = "Technocore community resources"
        official = "Technocore includes an MCP server"

        self.assertEqual(
            check_mcp_drift(community, official),
            "INCONCLUSIVE",
        )


if __name__ == "__main__":
    unittest.main()