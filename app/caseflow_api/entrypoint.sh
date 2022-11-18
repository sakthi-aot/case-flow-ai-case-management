echo 'starting application'
export FLASK_APP=manage.py
flask db upgrade
gunicorn -b :5000 'caseflow:create_app()' --timeout 120 --worker-class=gthread --workers=1 --threads=1
