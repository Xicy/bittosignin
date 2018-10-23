import {
    CurrentMarket,
    MarketsState,
    selectCurrentMarket,
    selectMarkets,
    selectMarketTickers,
} from '@openware/core-data';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import {
    AvailableSaveloadVersions,
    Bar,
    IChartingLibraryWidget,
    LanguageCode,
    ThemeName,
    widget,
} from '../../charting_library/charting_library.min';
import { RootState } from '../../modules';
import { dataFeedObject, print, TickSubscriptions } from './api';

interface ReduxProps {
    markets: CurrentMarket[];
    currentMarket: CurrentMarket;
    tickers: MarketsState['tickers'];
}

type Props = ReduxProps;

export class TradingChartComponent extends React.Component<Props> {

    private params = {
        symbol: this.props.currentMarket.id,
        interval: '15',
        containerId: 'tv_chart_container',
        libraryPath: '/charting_library/',
        chartsStorageUrl: 'https://saveload.tradingview.com',
        chartsStorageApiVersion: '1.1' as AvailableSaveloadVersions,
        clientId: 'tradingview.com',
        userId: 'public_user_id',
        fullscreen: false,
        autosize: true,
        studiesOverrides: {},
        theme: 'Light',
    };

    private tvWidget: IChartingLibraryWidget | null = null;
    private subscriptions: TickSubscriptions = {};

    public componentWillReceiveProps(next: Props) {
        Object.keys(this.subscriptions).map(k =>
            this.updateTickers(this.subscriptions[k], next.tickers),
        );
        if (next.currentMarket.id !== this.props.currentMarket.id) {
            if (this.tvWidget) {
                this.tvWidget = null;
            }
        }
        this.setChart(next.markets, next.currentMarket);
    }

    public shouldComponentUpdate() {
        return false;
    }

    public componentDidMount() {
        this.setChart(this.props.markets, this.props.currentMarket);
    }

    public componentWillUnmount() {
        if (this.tvWidget !== null) {
            // this.tvWidget.remove();
            this.tvWidget = null;
        }
    }

    public render() {
        return (
            <React.Fragment>
                <div className="cr-table-header__content">
                    <div className="cr-title-component">
                        {this.props.currentMarket.name}
                    </div>
                </div>
                <div
                    id={this.params.containerId}
                    className="pg-trading-chart"
                />
                <div id="cryptobase_chart" />
            </React.Fragment>
        );
    }

    private updateTickers = (
        { cb, ticker }, tickers: MarketsState['tickers'],
    ) => {
        Object.keys(tickers).map(pair => {
            if (pair === ticker) {
                const tick: Bar = {
                    time: tickers[ticker].at * 1e3,
                    open: tickers[ticker].open,
                    close: tickers[ticker].last,
                    high: tickers[ticker].high,
                    low: tickers[ticker].low,
                    volume: tickers[ticker].volume,
                };
                cb(tick);
            }
        });
    };

    private setChart = (
        markets: CurrentMarket[], currentMarket: CurrentMarket,
    ) => {

        const datafeed = dataFeedObject(markets, this.subscriptions);

        const widgetOptions = {
            debug: false,
            symbol: currentMarket.id,
            datafeed,
            interval: this.params.interval,
            container_id: this.params.containerId,
            library_path: this.params.libraryPath,
            locale: 'en' as LanguageCode,
            disabled_features: ['use_localstorage_for_settings'],
            enabled_features: ['show_animated_logo'],
            charts_storage_url: this.params.chartsStorageUrl,
            charts_storage_api_version: this.params.chartsStorageApiVersion,
            client_id: this.params.clientId,
            user_id: this.params.userId,
            fullscreen: this.params.fullscreen,
            autosize: this.params.autosize,
            studies_overrides: this.params.studiesOverrides,
            overrides: {
                ['symbolWatermarkProperties.color']: '#1f2a34',
                ['mainSeriesProperties.baselineStyle.topFillColor1']: '#1f2a34',
                ['mainSeriesProperties.baselineStyle.topFillColor2:']: '#1f2a34',
                ['volumePaneSize']: 'iny',
                ['mainSeriesProperties.candleStyle.upColor']: '#006cff',
                ['mainSeriesProperties.candleStyle.downColor']: '#0f0b67',
                ['mainSeriesProperties.candleStyle.borderUpColor']: '#006cff',
                ['mainSeriesProperties.candleStyle.borderDownColor']: '#0f0b67',
                ['mainSeriesProperties.candleStyle.wickUpColor']: '#5BA584',
                ['mainSeriesProperties.candleStyle.wickDownColor']: '#E95B5B',
                ['paneProperties.background']: '#1f2a34',
                ['paneProperties.vertGridProperties.color']: '#1f2a34',
                ['paneProperties.vertGridProperties.style']: 1,
                ['paneProperties.horzGridProperties.color']: '#1f2a34',
                ['paneProperties.horzGridProperties.style']: 1,
                ['paneProperties.crossHairProperties.color']: '#1f2a34',
                ['paneProperties.crossHairProperties.width']: 1,
                ['paneProperties.crossHairProperties.style']: 1,
                ['scalesProperties.backgroundColor']: '#1f2a34',
            },
            loading_screen: {
                backgroundColor: '#1f2a34',
            },
            popup_width: '000',
            hide_top_toolbar: true,
            enable_publishing: false,
            withdateranges: true,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            details: true,
            hotlist: true,
            calendar: true,
            show_popup_button: true,
            popup_height: '50',
            height: 610,
            theme: 'Dark' as ThemeName,
            toolbar_bg: '#1f2a34',
            style: 'dark',
        };

        if (this.tvWidget === null) {
            this.tvWidget = new widget(widgetOptions);
        }

        this.tvWidget.onChartReady(() => {
            this.tvWidget!.activeChart().setSymbol(currentMarket.id, () => {
                print('Symbol set', currentMarket.id);
            });

            const style = document.createElement('style');
            style.innerText = '.group-wWM3zP_M- { background: #1f2a34 !important; }';
            const chartIframe = document.querySelector('#tv_chart_container iframe');
            const chartIframeContent = (chartIframe as HTMLIFrameElement).contentWindow;
            if (chartIframeContent) {
                chartIframeContent.document.body.appendChild(style);
            }
        });
    };
}

const reduxProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    markets: selectMarkets(state),
    currentMarket: selectCurrentMarket(state),
    tickers: selectMarketTickers(state),
});

export const TradingChart =
    connect<ReduxProps, {}, {}, RootState>(reduxProps)(TradingChartComponent);
