output "fetch_themes_sns_topic_arn" {
  value = "${aws_sns_topic.fetch_themes.arn}"
}

output "fetch_themes_sqs_queue_url" {
  value = "${aws_sqs_queue.fetch_themes.id}"
}

output "fetch_themes_sqs_deadletter_queue_url" {
  value = "${aws_sqs_queue.fetch_themes_deadletter.id}"
}

output "process_repo_sns_topic_arn" {
  value = "${aws_sns_topic.process_repo.arn}"
}

output "process_repo_sqs_queue_url" {
  value = "${aws_sqs_queue.process_repo.id}"
}

output "process_repo_sqs_deadletter_queue_url" {
  value = "${aws_sqs_queue.process_repo_deadletter.id}"
}
