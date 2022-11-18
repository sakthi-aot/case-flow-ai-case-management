echo 'starting application'
export FLASK_APP=manage.py
gunicorn -b :5000 'caseflow:create_app()' --timeout 120 --worker-class=gthread --workers=1 --threads=1
cd caseflow
npm install -g stepzen
stepzen login -a vratsa << EOF
vratsa::stepzen.io+1000::c18eb926289b106492deab27f8b8217cace499e2ea017bf27e2a8f65836376be
EOF