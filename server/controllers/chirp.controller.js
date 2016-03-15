import Chirp from '../models/chirp';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';

export function addChirp(req, res) {
  if (!req.body.chirp.content) {
    return res.status(403).end();
  }

  const newChirp = new Chirp(req.body.chirp);

  newChirp.content = sanitizeHtml(newChirp.content);
  newChirp.username = sanitizeHtml(newChirp.username);
  newChirp.cuid = cuid();
  newChirp.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ chirp: saved });
  });
}

export function getChirp(req, res) {
  const newSlug = req.query.slug.split('-');
  const newCuid = newSlug[newSlug.length - 1];
  Chirp.findOne({ cuid: newCuid }).exec((err, chirp) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ chirp });
  });
}

export function getChirps(req, res) {
  Chirp.find().sort('-dateAdded').exec((err, chirps) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ chirps });
  });
}

