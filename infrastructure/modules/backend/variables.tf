variable "environment" {}
variable "algolia_app_id" {}
variable "algolia_api_key" {}
variable "algolia_index" {}
variable "sentry_dsn" {}
variable "init_job_rate" {}

variable "sqs_visibility_timeout" {
  default = 10
}

variable "sqs_receive_timeout" {
  # Set this larger than the visibility timeout so that retries remain in the queue.
  default = 15
}

variable job_concurrency {
  # Limits our lambda function to only process one job at a time. 
  # For a recursive job, notifying itself before the execution of the current
  # function invocation completes will cause a 2nd concurrent job to created.
  # This isn't a bad thing, but we don't really need concurrency and makes 
  # the logs in CloudWatch harder to read because they are split up into 
  # separate log streams for each invocation.
  default = 1
}
