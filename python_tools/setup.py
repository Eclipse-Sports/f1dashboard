
import os
from setuptools import setup


with open('requirements.txt') as f:
    required = f.read().splitlines()

setup(
    name='Eclipse',
    version='0.0.1',
    readme="README.md",
    authors=[
        {name: "Fehmi Arda Akman", email: "arda.akman@berkeley.edu"},
        {name: "Jai Singh", email: "jai.s@berkeley.edu"},
        {name: "Ergun Acikoz", email: "ergunackz@berkeley.edu"},
    ],
    description='Sports Analytics and Visualization Tool',
    install_requires=required
)
