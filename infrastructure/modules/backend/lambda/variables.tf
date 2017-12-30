variable "name" {}
variable "environment" {}

variable "sns_trigger_arn" {
  default = ""
}

variable "sns_publish_arns" {
  type    = "list"
  default = []
}

variable "sqs_receive_arns" {
  type    = "list"
  default = []
}

variable "sqs_send_arns" {
  type    = "list"
  default = []
}

variable "sqs_delete_arns" {
  type    = "list"
  default = []
}

variable "environment_variables" {
  type = "map"
}
