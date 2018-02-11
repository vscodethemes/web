resource "aws_sns_topic" "scrape_extensions" {
  name = "scrape_extensions"
}

resource "aws_sns_topic" "extract_themes" {
  name = "extract_themes"
}

resource "aws_sns_topic" "extract_colors" {
  name = "extract_colors"
}

resource "aws_sns_topic" "save_theme" {
  name = "save_theme"
}
