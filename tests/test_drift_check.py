import sys
import unittest

sys.path.insert(0, "src")

from drift_check import (
    check_mcp_presence_drift,
    check_mcp_tool_count_drift,
)


class TestMCPPresenceDrift(unittest.TestCase):

    def test_stale_claim(self):
        community = "there is no MCP server"
        official = "Technocore includes an MCP server"

        self.assertEqual(
            check_mcp_presence_drift(community, official),
            "STALE",
        )

    def test_unsupported_claim(self):
        community = "there is no MCP server"
        official = "Technocore chat documentation"

        self.assertEqual(
            check_mcp_presence_drift(community, official),
            "UNSUPPORTED",
        )

    def test_inconclusive(self):
        community = "Technocore community resources"
        official = "Technocore includes an MCP server"

        self.assertEqual(
            check_mcp_presence_drift(community, official),
            "INCONCLUSIVE",
        )


class TestMCPToolCountDrift(unittest.TestCase):

    def test_stale_tool_count(self):
        external = "Technocore has 9 tools total"
        official = "Technocore MCP exposes 13 tools"

        self.assertEqual(
            check_mcp_tool_count_drift(external, official),
            "STALE",
        )

    def test_unsupported_tool_count(self):
        external = "Technocore has 9 tools"
        official = "Technocore MCP documentation"

        self.assertEqual(
            check_mcp_tool_count_drift(external, official),
            "UNSUPPORTED",
        )

    def test_inconclusive_tool_count(self):
        external = "Technocore integration overview"
        official = "Technocore MCP exposes 13 tools"

        self.assertEqual(
            check_mcp_tool_count_drift(external, official),
            "INCONCLUSIVE",
        )


if __name__ == "__main__":
    unittest.main()