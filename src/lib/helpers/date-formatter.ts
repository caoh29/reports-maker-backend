export class DateFormatter {
  static readonly formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  static getDDMMYYYY(date: Date): string {
    return this.formatter.format(date);
  }
}
