output "scrape_themes_sns_topic_arn" {
  value = "${aws_sns_topic.scrape_themes.arn}"
}

output "scrape_themes_sqs_queue_url" {
  value = "${aws_sqs_queue.scrape_themes.id}"
}

output "scrape_themes_sqs_deadletter_queue_url" {
  value = "${aws_sqs_queue.scrape_themes_deadletter.id}"
}

output "extract_themes_sns_topic_arn" {
  value = "${aws_sns_topic.extract_themes.arn}"
}

output "extract_themes_sqs_queue_url" {
  value = "${aws_sqs_queue.extract_themes.id}"
}

output "extract_themes_sqs_deadletter_queue_url" {
  value = "${aws_sqs_queue.extract_themes_deadletter.id}"
}
