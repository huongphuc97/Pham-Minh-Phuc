interface WalletBalance {
    currency: string;
    amount: number;
    blockchain?: string;
    usdValue?: number;
    formatted?: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: string): number => {
        const priorities = {
            'Osmosis': 100,
            'Ethereum': 50,
            'Arbitrum': 30,
            'Zilliqa': 20,
            'Neo': 20,
        };
        return priorities[blockchain] ?? -99;
    }

    const filterBalances = (balanceArr: WalletBalance[]) => {
        return balanceArr.filter((balance: WalletBalance) => false)
    }

    const sortBalances = (balanceArr: WalletBalance[]) => {
        return balanceArr.sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            return rightPriority - leftPriority;
        })
    }

    const mappingFieldBalances = (balanceArr: WalletBalance[]) => {
        return balanceArr.map((balance: WalletBalance) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return {
                ...balance,
                formatted: balance.amount.toFixed(),
                usdValue: usdValue
            }
        })
    }

    const sortedBalances = useMemo(() => {
        const filterArray = filterBalances(balances)
        const sortArray = sortBalances(filterArray)
        return mappingFieldBalances(sortArray)
    }, [balances, prices]);

    const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={balance.usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })

    return (
        <div {...rest}>
            {rows}
        </div>
    )
}