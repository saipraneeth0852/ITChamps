## MCP Tools: code-review-graph

Use code-review-graph MCP tools BEFORE Grep/Glob/Read:
- Explore: `semantic_search_nodes`, `query_graph`
- Impact: `get_impact_radius`, `get_affected_flows`
- Review: `detect_changes`, `get_review_context`
- Architecture: `get_architecture_overview`

Fall back to Grep/Glob/Read only when the graph doesn't cover it.
