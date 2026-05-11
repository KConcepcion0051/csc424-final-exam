var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/api/ping", () => Results.Ok(new { status = "ok", message = "pong" }));

app.Run();