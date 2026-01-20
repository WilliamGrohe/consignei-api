export function getConsignmentStatus(daysWithoutCheck) {
  if (daysWithoutCheck > 180) {
    return 'CRITICAL';
  }

  if (daysWithoutCheck > 90) {
    return 'WARNING';
  }

  return 'OK';
}