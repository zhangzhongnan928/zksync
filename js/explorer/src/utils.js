import { ethers } from 'ethers';

export const sleep = async ms => await new Promise(resolve => setTimeout(resolve, ms));

const readablyPrintableTokens = ['ETH', 'FAU'];

export function isReadablyPrintable(tokenName) {
    return readablyPrintableTokens.includes(tokenName);
}

/**
 * If amount >= 1.0, we leave up to 3 digits after comma.
 * If it's less, we leave up to 3 the most significant 
 * digits of the fraction part of the amount.
 * 
 * examples:
 * '0.0000128748239817239486128' => '0.0000128'
 * '1.00232132738' => '1.002'
 */
export function readableEther(wei) {
    let formatted = ethers.utils.formatUnits(wei, 18);
    if (formatted.startsWith('0.') == false) {
        return formatted.match(/\d+\.\d{1,3}/)[0];
    } else {
        return formatted.match(/0\.0*[^0]{0,3}/)[0];
    }
}

export function shortenHash(str, fallback) {
    try {
        return `${str.slice(0, 8)}..${str.slice(-6)}`;
    } catch (e) {
        return fallback || 'unknown';
    }
}

export function formatDate(timeStr) {
    if (timeStr == null) return '';
    return timeStr.toString().split('T')[0] + " " + timeStr.toString().split('T')[1].split('.')[0] + " UTC";
}
