import * as PartnersRepo from '../repositories/partners.repository.js';
export async function getPartners(req, res) {
  try {
    const partners = await PartnersRepo.getPartners();
    res.json(partners);
    console.log(partners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao carregar parceiros' });
  }
}