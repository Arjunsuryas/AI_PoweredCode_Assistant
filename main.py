# app.py
from dash import Dash, html

# Initialize the app
app = Dash(__name__)

# Define layout (like JSX in React)
app.layout = html.Div([
    html.H1("Hello, Dash!"),
    html.P("This is similar to rendering <App /> in React.")
])

if __name__ == "__main__":
    app.run_server(debug=True)
