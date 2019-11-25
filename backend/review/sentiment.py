from tensorflow.keras import models
from konlpy.tag import Okt
import nltk
import numpy as np

def tokenize(doc, okt):
    return ['/'.join(t) for t in okt.pos(doc, norm=True, stem=True)]

def term_frequency(doc, selected_words):
    return [doc.count(word) for word in selected_words]

def predict_score(model, okt, selected_words, review):
    token = tokenize(review, okt)
    tf = term_frequency(token, selected_words)
    data = np.expand_dims(np.asarray(tf).astype('float32'), axis=0)
    score = float(model.predict(data))

    return round(score,2) * 10
