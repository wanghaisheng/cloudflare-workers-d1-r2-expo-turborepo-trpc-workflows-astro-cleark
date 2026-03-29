#!/usr/bin/env python3
"""
Wiki Content Generator for ASO Skill

Generates API reference documentation from Python module docstrings.
Extracts function signatures, parameters, return types, and examples.

Usage:
    python scripts/generate-wiki-content.py

Output:
    /tmp/wiki/API-Reference.md
    /tmp/wiki/FAQ.md
    (other wiki pages as needed)
"""

import os
import re
import ast
from pathlib import Path
from datetime import datetime


def extract_docstring_info(docstring: str) -> dict:
    """
    Extract structured information from docstring.

    Args:
        docstring: Raw docstring text

    Returns:
        dict with keys: description, args, returns, examples
    """
    if not docstring:
        return {"description": "", "args": [], "returns": "", "examples": []}

    lines = docstring.strip().split("\n")
    result = {
        "description": [],
        "args": [],
        "returns": "",
        "examples": [],
    }

    current_section = "description"
    current_arg = None

    for line in lines:
        line_stripped = line.strip()

        if line_stripped.startswith("Args:"):
            current_section = "args"
            continue
        elif line_stripped.startswith("Returns:"):
            current_section = "returns"
            continue
        elif line_stripped.startswith("Example"):
            current_section = "examples"
            continue

        if current_section == "description":
            result["description"].append(line_stripped)
        elif current_section == "args":
            # Match arg format: name (type): description
            match = re.match(r"(\w+)\s*\((.*?)\):\s*(.*)", line_stripped)
            if match:
                current_arg = {
                    "name": match.group(1),
                    "type": match.group(2),
                    "description": match.group(3),
                }
                result["args"].append(current_arg)
            elif current_arg and line_stripped:
                current_arg["description"] += " " + line_stripped
        elif current_section == "returns":
            result["returns"] += line_stripped + " "
        elif current_section == "examples":
            result["examples"].append(line)

    result["description"] = " ".join(result["description"]).strip()
    result["returns"] = result["returns"].strip()

    return result


def generate_api_reference():
    """Generate API reference from ASO skill modules."""
    output = ["# API Reference\n\n"]
    output.append("Complete API documentation for all ASO skill modules.\n\n")
    output.append(
        f"**Last Updated:** {datetime.now().strftime('%B %d, %Y')}\n\n"
    )

    modules = [
        ("keyword_analyzer.py", "Keyword Analysis"),
        ("metadata_optimizer.py", "Metadata Optimization"),
        ("competitor_analyzer.py", "Competitor Analysis"),
        ("aso_scorer.py", "ASO Scoring"),
        ("ab_test_planner.py", "A/B Testing"),
        ("localization_helper.py", "Localization"),
        ("review_analyzer.py", "Review Analysis"),
        ("launch_checklist.py", "Launch Checklist"),
    ]

    for module_file, module_name in modules:
        module_path = Path(f"app-store-optimization/{module_file}")

        if not module_path.exists():
            continue

        output.append(f"## {module_name}\n\n")
        output.append(f"**Module:** `{module_file}`\n\n")

        try:
            with open(module_path, "r", encoding="utf-8") as f:
                tree = ast.parse(f.read())

            # Extract functions
            for node in ast.walk(tree):
                if isinstance(node, ast.FunctionDef):
                    # Skip private functions
                    if node.name.startswith("_"):
                        continue

                    # Get function signature
                    args = [arg.arg for arg in node.args.args]
                    signature = f"{node.name}({', '.join(args)})"

                    output.append(f"### `{signature}`\n\n")

                    # Get docstring
                    docstring = ast.get_docstring(node)
                    if docstring:
                        info = extract_docstring_info(docstring)

                        if info["description"]:
                            output.append(f"{info['description']}\n\n")

                        if info["args"]:
                            output.append("**Parameters:**\n\n")
                            for arg in info["args"]:
                                output.append(
                                    f"- `{arg['name']}` ({arg['type']}): "
                                    f"{arg['description']}\n"
                                )
                            output.append("\n")

                        if info["returns"]:
                            output.append(f"**Returns:** {info['returns']}\n\n")

                        if info["examples"]:
                            output.append("**Example:**\n\n```python\n")
                            output.extend(info["examples"])
                            output.append("\n```\n\n")

                    output.append("---\n\n")

        except Exception as e:
            print(f"Error processing {module_file}: {e}")
            continue

    return "".join(output)


def generate_faq():
    """Generate FAQ page."""
    faq = """# Frequently Asked Questions

## Installation & Setup

### How do I install the ASO skill?

For user-level installation (available in all projects):
```bash
cp -r app-store-optimization ~/.claude/skills/
```

For project-level installation:
```bash
cp -r app-store-optimization /path/to/project/.claude/skills/
```

Verify installation:
```bash
ls ~/.claude/skills/app-store-optimization/
# Should show: SKILL.md, 8 Python modules, sample files
```

### Do I need any API keys?

No! The ASO skill uses only Python's standard library. The iTunes Search API integration is public and requires no authentication.

### What Python version do I need?

Python 3.8 or higher. The skill is tested on Python 3.8, 3.9, 3.10, 3.11, 3.12, and 3.13.

## Using the Skill

### What's the difference between Apple and Google metadata?

**Apple App Store:**
- Title: 30 characters
- Subtitle: 30 characters
- Keywords: 100 characters (comma-separated, no spaces)

**Google Play Store:**
- Title: 50 characters
- Short Description: 80 characters
- Keywords: Extracted from title and description (no keyword field)

### How do I use the ASO agents?

1. Install agents to `~/.claude/agents/`
2. Run `/aso-full-audit YourAppName` for complete ASO analysis
3. Or use specific commands:
   - `/aso-optimize` - Quick metadata optimization
   - `/aso-prelaunch` - Launch planning
   - `/aso-competitor` - Competitive intelligence

### Can I use this for web apps?

No, the ASO skill is specifically designed for mobile app store optimization (Apple App Store and Google Play Store).

## Character Limits

### Why are character limits so important?

App stores reject metadata that exceeds limits. The ASO skill automatically validates and optimizes to prevent submission errors.

### What happens if I exceed a character limit?

The skill's optimization functions automatically truncate or rephrase to fit within limits while maintaining meaning and keyword density.

## Troubleshooting

### The iTunes API isn't returning data

The iTunes Search API is free but has rate limits. Wait a few seconds between requests. For bulk analysis, implement delays.

### My keywords aren't being recognized

Keywords are case-insensitive and normalized. The skill automatically handles:
- Lowercase conversion
- Whitespace normalization
- Duplicate removal
- Synonym detection

### How do I report a bug?

1. Go to [Issues](https://github.com/alirezarezvani/claude-code-aso-skill/issues)
2. Use the Bug Report template
3. Include module, platform, and reproduction steps

## Advanced Usage

### Can I add custom modules?

Yes! Add new .py files to `app-store-optimization/` following the same structure. No external dependencies allowed.

### How do I contribute?

See [Contributing Guide](https://github.com/alirezarezvani/claude-code-aso-skill/blob/main/.github/CONTRIBUTING.md)

### Is there a community?

- [GitHub Discussions](https://github.com/alirezarezvani/claude-code-aso-skill/discussions)
- [Issue Tracker](https://github.com/alirezarezvani/claude-code-aso-skill/issues)
- [Wiki](https://github.com/alirezarezvani/claude-code-aso-skill/wiki)

---

**More questions?** Open a [GitHub Discussion](https://github.com/alirezarezvani/claude-code-aso-skill/discussions)
"""
    return faq


def main():
    """Generate all wiki content."""
    # Create output directory
    os.makedirs("/tmp/wiki", exist_ok=True)

    # Generate API reference
    print("Generating API reference...")
    api_ref = generate_api_reference()
    with open("/tmp/wiki/API-Reference.md", "w", encoding="utf-8") as f:
        f.write(api_ref)
    print("✅ API-Reference.md created")

    # Generate FAQ
    print("Generating FAQ...")
    faq = generate_faq()
    with open("/tmp/wiki/FAQ.md", "w", encoding="utf-8") as f:
        f.write(faq)
    print("✅ FAQ.md created")

    print("\nWiki content generation complete!")
    print("Output: /tmp/wiki/")


if __name__ == "__main__":
    main()
