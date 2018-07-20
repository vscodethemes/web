resource "aws_cloudfront_distribution" "app" {
  origin {
    domain_name = "${var.app_domain}"
    origin_id   = "app"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "match-viewer"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  aliases         = ["${var.aliases}"]
  enabled         = true
  is_ipv6_enabled = true

  # use PriceClass_200 for edge locations outside of US, Canada and Europe
  price_class = "PriceClass_100"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "app"

    forwarded_values {
      query_string = true
      headers      = ["Origin", "Host"]

      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
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
    acm_certificate_arn            = "${var.acm_certificate_arn}"
    ssl_support_method             = "sni-only"
    cloudfront_default_certificate = "true"
  }

  logging_config {
    bucket          = "${var.logs_bucket}"
    prefix          = "${var.app_domain}"
    include_cookies = true
  }

  tags {
    Environment = "${var.environment}"
  }
}
