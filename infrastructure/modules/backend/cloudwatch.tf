resource "aws_cloudwatch_event_rule" "run_all" {
  name                = "run_all"
  schedule_expression = "rate(30 minutes)"
}

resource "aws_cloudwatch_event_rule" "init" {
  name                = "init"
  schedule_expression = "rate(8 hours)"
}