# Scrape themes.
resource "aws_sns_topic" "scrape_themes" {
  name = "scrape_themes"
}

# Extract themes.
resource "aws_sns_topic" "extract_themes" {
  name = "extract_themes"
}
