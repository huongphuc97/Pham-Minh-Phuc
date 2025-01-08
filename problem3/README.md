Things I did to refactor this problem:
- Added 3 optional props for interface WalletBalance and removed interface FormattedWalletBalance.
- Used nullish coalescing operator instead of switch case in getPriority function.
- Split sortedBalances useMemo into smaller function.
- In useMemo sortedBalances got some problems: 
  + Filter: The variable balancePriority was not used here and variable lhsPriority was not defined somewhere so I changed to return false (for my understanding in this logic).
  + Sort: refactor sort logic to make it easier to understand.
  + Map: I used map here to combine both formattedBalances variable and usdValue variable below.