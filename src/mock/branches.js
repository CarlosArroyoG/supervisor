export const branches = [
  {
    id: 1,
    name: 'Sucursal Centro',
    address: 'Av. Principal 123, Ciudad',
    status: 'good',
    lastEvaluation: '2023-05-15'
  },
  {
    id: 2,
    name: 'Sucursal Norte',
    address: 'Calle Secundaria 456, Ciudad',
    status: 'needs_attention',
    lastEvaluation: '2023-04-20'
  },
  {
    id: 3,
    name: 'Sucursal Sur',
    address: 'Boulevard Comercial 789, Ciudad',
    status: 'good',
    lastEvaluation: '2023-05-10'
  }
];

export const evaluations = [
  {
    id: 1,
    branchId: 1,
    date: '2023-05-15',
    cleanliness: 4,
    organization: 5,
    inventory: 3,
    process: 4,
    appearance: 5,
    notes: 'Todo en orden excepto pequeño faltante en inventario'
  },
  {
    id: 2,
    branchId: 2,
    date: '2023-04-20',
    cleanliness: 2,
    organization: 3,
    inventory: 1,
    process: 2,
    appearance: 3,
    notes: 'Faltante significativo de inventario y procesos no seguidos'
  }
];