const extensions = [{
  guid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  name: 'Poste Bureau 1',
  hostname: 'PC-BUREAU-01',
  status: 'active',
  lastSeen: '2024-01-15T10:30:00Z'
}, {
  guid: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  name: 'Poste Comptabilité',
  hostname: 'PC-COMPTA-01',
  status: 'active',
  lastSeen: '2024-01-15T10:28:00Z'
}, {
  guid: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
  name: 'Poste RH',
  hostname: 'PC-RH-01',
  status: 'inactive',
  lastSeen: '2024-01-14T18:45:00Z'
}, {
  guid: 'd4e5f6a7-b8c9-0123-defa-234567890123',
  name: 'Poste Direction',
  hostname: 'PC-DIR-01',
  status: 'active',
  lastSeen: '2024-01-15T10:25:00Z'
}, {
  guid: 'e5f6a7b8-c9d0-1234-efab-345678901234',
  name: 'Poste Commercial 1',
  hostname: 'PC-COM-01',
  status: 'pending',
  lastSeen: '2024-01-15T09:00:00Z'
}, {
  guid: 'f6a7b8c9-d0e1-2345-fabc-456789012345',
  name: 'Poste Commercial 2',
  hostname: 'PC-COM-02',
  status: 'active',
  lastSeen: '2024-01-15T10:29:00Z'
}]

export default eventHandler(async () => {
  return extensions
})
