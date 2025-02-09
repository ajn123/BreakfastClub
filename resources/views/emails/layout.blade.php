<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Touch Grass DC' }}</title>
    <style>
        /* Reset styles */
        body {
            margin: 0;
            padding: 0;
            background-color: #FFF7ED;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #4B5563;
        }

        /* Container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header */
        .header {
            text-align: center;
            padding: 30px 0;
            background-color: #FFF7ED;
        }

        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #EA580C;
            text-decoration: none;
        }

        /* Content */
        .content {
            background-color: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            margin: 20px 0;
        }

        /* Typography */
        h1 {
            color: #EA580C;
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
        }

        p {
            margin-bottom: 16px;
            font-size: 16px;
        }

        /* Button */
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #EA580C;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            text-align: center;
            margin: 20px 0;
        }

        .button:hover {
            background-color: #C2410C;
        }

        /* Footer */
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #6B7280;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-link {
            color: #EA580C;
            text-decoration: none;
            margin: 0 10px;
        }

        /* Responsive */
        @media only screen and (max-width: 600px) {
            .container {
                padding: 10px;
            }

            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Touch Grass DC</div>
        </div>

        <div class="content">
            @yield('content')
        </div>

        <div class="footer">
            <div class="social-links">
                <a href="#" class="social-link">Instagram</a>
                <a href="#" class="social-link">Twitter</a>
                <a href="#" class="social-link">Facebook</a>
            </div>
            <p>© {{ date('Y') }} The Breakfast Club DC. All rights reserved.</p>
            <p>You're receiving this email because you're a member of The Breakfast Club.</p>

            {{-- <p><a href="{{ route('profile.show') }}" style="color: #EA580C;">Update email preferences</a></p>
             --}}
        </div>
    </div>
</body>
</html> 