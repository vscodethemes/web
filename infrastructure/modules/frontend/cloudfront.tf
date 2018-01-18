resource "aws_cloudfront_distribution" "distribution" {
  origin {
    domain_name = "${aws_s3_bucket.bucket.website_endpoint}"
    origin_id   = "S3Origin"

    // Specifying custom_origin_config forces AWS API to consider the 
    // S3 bucket a proper website.
    // https://kupczynski.info/2017/03/06/terraform-cloudfront-s3-static-hosting.html
    custom_origin_config {
      origin_protocol_policy = "http-only"
      http_port              = "80"
      https_port             = "443"
      origin_ssl_protocols   = ["TLSv1"]
    }
  }

  aliases = ["${var.domain}", "www.${var.domain}"]

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  # use PriceClass_200 for edge locations outside of US, Canada and Europe
  price_class = "PriceClass_100"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3Origin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = "true"
  }

  tags {
    environment = "${var.environment}"
  }
}
