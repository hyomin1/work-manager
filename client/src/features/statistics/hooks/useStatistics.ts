import { useQuery } from '@tanstack/react-query';
import { getDestinationStatistics, getUserStatistics } from '../api/statistics';
import type { StatByDestination, StatByName } from '../types/statistics';

export default function useStatistics(
  username: string,
  destination: string,
  startDate: Date,
  endDate: Date
) {
  const { data: userStatistics } = useQuery<StatByName[]>({
    queryKey: ['statistics', username, startDate],
    queryFn: () => getUserStatistics(username, startDate, endDate),
    enabled: !!username,
  });

  const { data: destinationStatistics } = useQuery<StatByDestination[]>({
    queryKey: ['statistics', destination],
    queryFn: () => getDestinationStatistics(destination, startDate, endDate),
    enabled: !!destination,
  });

  return { userStatistics, destinationStatistics };
}
