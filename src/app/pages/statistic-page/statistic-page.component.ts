import { Component, OnInit,inject } from '@angular/core';
import { BitcoinService } from '../../services/bitcoin.service'; // Update this path
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})
export class StatisticPageComponent implements OnInit {
  tradeVolumeData: any;
  avgBlockSizeData: any;
  marketPriceData: any;

  bitcoinService=inject(BitcoinService)

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.bitcoinService.getTradeVolume().subscribe(
      (data) => {
        this.tradeVolumeData = data;
        this.renderTradeVolumeChart(data);
      },
      (error) => {
        console.error('Error fetching trade volume:', error);
        // Handle error if needed
      }
    );

    this.bitcoinService.getAvgBlockSize().subscribe(
      (data) => {
        this.avgBlockSizeData = data;
        this.renderAvgBlockSizeChart(data);
      },
      (error) => {
        console.error('Error fetching average block size:', error);
        // Handle error if needed
      }
    );

    this.bitcoinService.getMarketPrice().subscribe(
      (data) => {
        this.marketPriceData = data;
        this.renderMarketPriceChart(data);
      },
      (error) => {
        console.error('Error fetching market price:', error);
        // Handle error if needed
      }
    );
  }
  renderTradeVolumeChart(data: any): void {
    const values = data.values.map((item: any) => item.y);
    const labels = data.values.map((item: any) => item.x);

    const ctx = document.getElementById('tradeVolumeChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Trade Volume',
          data: values,
          fill: false,
          borderColor: 'blue',
          borderWidth: 1
        }]
      },
      options: {
        // Customize Chart.js options as needed
      }
    });
  }

  renderAvgBlockSizeChart(data: any): void {
    const values = data.values.map((item: any) => item.y);
    const labels = data.values.map((item: any) => item.x);

    const ctx = document.getElementById('avgBlockSizeChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Average Block Size',
          data: values,
          fill: false,
          borderColor: 'green',
          borderWidth: 1
        }]
      },
      options: {
        // Customize Chart.js options as needed
      }
    });
  }

  renderMarketPriceChart(data: any): void {
    const values = data.values.map((item: any) => item.y);
    const labels = data.values.map((item: any) => item.x);

    const ctx = document.getElementById('marketPriceChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Market Price',
          data: values,
          fill: false,
          borderColor: 'red',
          borderWidth: 1
        }]
      },
      options: {
        // Customize Chart.js options as needed
      }
    });
  }
}
