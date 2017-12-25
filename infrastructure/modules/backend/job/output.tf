output "sns_topic_arn" {
  value = "${aws_sns_topic.topic.arn}"
}

output "sqs_queue_url" {
  value = "${aws_sqs_queue.queue.id}"
}

output "sqs_deadletter_queue_url" {
  value = "${aws_sqs_queue.deadletter.id}"
}
