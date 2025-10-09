import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import DrugsPage from './drugs-page';
import { describe, expect, it, vi } from 'vitest'

// --- Mock API modules used by the component ---
const FAKE_ROWS = [
  { id: 1, code: 'A', name: 'Alpha (A)', company: 'Pfizer',  launchDate: '2022-01-01T00:00:00Z' },
  { id: 2, code: 'B', name: 'Beta (B)',  company: 'Merck',   launchDate: '2021-01-01T00:00:00Z' },
  { id: 3, code: 'C', name: 'Gamma (C)', company: 'Pfizer',  launchDate: '2020-01-01T00:00:00Z' },
];


vi.mock('../api/config.api.ts', () => ({
  fetchConfig: vi.fn().mockResolvedValue({
    columns: [
      { field: 'id', headerName: 'Id' },
      { field: 'code', headerName: 'Code' },
      { field: 'name', headerName: 'Name' },
      { field: 'company', headerName: 'Company' },
      { field: 'launchDate', headerName: 'Launch Date' },
    ],
    defaultSort: { field: 'launchDate', direction: 'desc' as const },
  }),
}));

// We’ll vary results by `company` to simulate server-side filtering
const fetchDrugsMock = vi.fn(({ company, page, limit }: any) => {
  const filtered = FAKE_ROWS.filter(r => !company || r.company === company);
  const p = Math.max(1, page ?? 1);
  const l = Math.max(1, limit ?? 10);
  return Promise.resolve({
    rows: filtered.slice((p - 1) * l, (p - 1) * l + l),
    total: filtered.length,
  });
});
vi.mock('../api/drug.api.ts', () => ({
  fetchDrugs: (args: any) => fetchDrugsMock(args),
}));

vi.mock('../api/company.ts', () => ({
  fetchCompany: vi.fn().mockResolvedValue(['Merck', 'Pfizer']),
}));

// --- The test ---
describe('DrugsPage filtering', () => {
  it('calls API with selected company and shows filtered rows', async () => {
    render(<DrugsPage />);

    // Wait for initial load (dropdown appears)
    const select = await screen.findByLabelText(/filter by company/i);

    // Open the MUI Select and pick "Pfizer"
    fireEvent.mouseDown(select);
    const pfizer = await screen.findByRole('option', { name: 'Pfizer' });
    fireEvent.click(pfizer);

    // Assert API was called with the company filter
    await waitFor(() => {
      expect(fetchDrugsMock).toHaveBeenCalledWith(
        expect.objectContaining({ company: 'Pfizer' })
      );
    });

    // Optionally assert rendered rows contain only Pfizer items
    // (A simple way is to check the cell texts present)
    const pfizerCells = await screen.findAllByText('Pfizer');
    expect(pfizerCells.length).toBeGreaterThan(0);

    // And ensure a Merck-only row is not present after filter (best-effort)
    expect(screen.queryByText('Merck')).toBeNull();
  });
});
