import http.server
import socketserver

with socketserver.TCPServer(
    ('', 5000),
    http.server.SimpleHTTPRequestHandler
) as httpd:
    httpd.serve_forever()
