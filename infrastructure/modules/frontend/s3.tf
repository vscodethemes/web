# TODO: Only allow ready access from CF origin.

data "aws_iam_policy_document" "bucket_policy" {
  # Allows public reads from everyone to the s3 bucket.
  statement {
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.domain}/*"]

    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket" "bucket" {
  bucket = "${var.domain}"
  acl    = "private"
  policy = "${data.aws_iam_policy_document.bucket_policy.json}"

  website {
    index_document = "index.html"
  }

  tags {
    environment = "${var.environment}"
  }
}
