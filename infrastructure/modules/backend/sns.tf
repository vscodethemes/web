# Fetch themes.
resource "aws_sns_topic" "fetch_themes" {
  name = "fetch_themes"
}

# Process repository.
resource "aws_sns_topic" "process_repo" {
  name = "process_repo"
}
