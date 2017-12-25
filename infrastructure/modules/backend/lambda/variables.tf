variable "name" {}
variable "environment" {}
variable "sns_trigger_arn" {}

variable "sns_publish_arns" {
  type = "list"
}

variable "sqs_receive_arns" {
  type = "list"
}

variable "sqs_send_arns" {
  type = "list"
}

variable "sqs_delete_arns" {
  type = "list"
}

variable "environment_variables" {
  type = "map"
}
