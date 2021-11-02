from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length




class SearchForm(FlaskForm):
    name = StringField('Check your fav movie', validators=[DataRequired(), Length(max=100, message='movie name should not have characters more than 100')])
    submit = SubmitField('Search')


