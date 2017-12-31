# Scrape themes.
resource "aws_sns_topic" "scrape_themes" {
  name = "scrape_themes"
}

# Extract themes.
resource "aws_sns_topic" "extract_themes" {
  name = "extract_themes"
}

# Extract colors.
resource "aws_sns_topic" "extract_colors" {
  name = "extract_colors"
}

# Save theme.
resource "aws_sns_topic" "save_theme" {
  name = "save_theme"
}

# Publish frontend.
resource "aws_sns_topic" "publish_frontend" {
  name = "publish_frontend"
}
