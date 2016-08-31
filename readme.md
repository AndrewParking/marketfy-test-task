# Marketfy Test Task


Clone this repo.
```
git clone https://github.com/AndrewParking/maketfy-test-task.git
```

Go to the project directory.
```
cd marketfy-test-task
```

Start vagrant vm and ssh in.
```
vagrant up && vagrant ssh
```

Source the virtualenv.
```
. /.virtualenvs/app/bin/activate
```

Go to project directory.
```
cd /marketfy-test-task
```

Install requirements.
```
pip install -r requirements.txt
```

Run application.
```
python app/main.py
```

Visit `10.0.0.5:8888` in your browser.
