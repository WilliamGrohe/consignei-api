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

export async function createPartner(req, res) {
  try {
    // ⚠️ depois isso virá do auth (JWT)
    const userId = req.user?.id || '11111111-1111-1111-1111-111111111111'; 
    const partner = req.body;

    if (!partner.name || !partner.cnpj) {
      return res.status(400).json({
        error: 'Nome e CNPJ são obrigatórios',
      });
    }
    
    const newPartner = await PartnersRepo.createPartner({
      userId,
      ...partner
    })
    return res.status(201).json(newPartner);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Erro ao cadastrar parceiro',
    });
  }
}