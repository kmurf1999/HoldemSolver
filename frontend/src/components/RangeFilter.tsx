import React from 'react';
import styled from 'styled-components';
import { colors, makeOpaque } from "../styles";

import { BiRadioCircleMarked } from 'react-icons/bi';

const MADE_HAND_CATEGORIES = [{
    class: ">= Quads",
    percent: "0.5%"
},{
    class: "Full house",
    percent: "0.2%"
},{
    class: "Flush",
    percent: "0.2%"
},{
    class: "3 of a kind",
    percent: "0.2%"
},{
    class: "Two pair",
    percent: "0.1%"
},{
    class: "One pair",
    percent: "0.01%"
}];

const DRAW_HAND_CATEGORIES = [{
    class: "2 card fd",
    percent: "0.02%"
},{
    class: "OESD",
    percent: "0.02%"
}];

const RangeFilterStyle = styled.div`
    .range-filter-container {
        background: white;
        box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
        border-radius: 2px;
    }
    .range-filter-table {
        width: 100%;
        overflow-y: auto;
        .range-filter-table-item {
            &:hover {
                background: ${colors.primary};
                color: #fff;
                .range-filter-select > div {
                    border-color: #fff;
                }
            }
        }
        .range-filter-select {
            > div {
                width: 1em;
                height: 1em;
                border: 2px solid #ccc;
                border-radius: 2px;
            }
        }
        .hand-class-label {
            font-size: 12px;
            background: rgba(0, 0, 0, 0.05);
            padding: .6em 1em;
        }
    }
`;

type RangeFilterProps = {
    className?: string
}

const RangeFilter: React.FC<RangeFilterProps> = ({ className = "" }) => (
    <RangeFilterStyle className={className}>
        <div className="range-filter-container">
            <table className="range-filter-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>HAND CLASS</th>
                        <th>% OF RANGE</th>
                    </tr>
                </thead>
                <tbody>
                <tr><th className="hand-class-label" colSpan={3}>MADE HANDS</th></tr>
                {MADE_HAND_CATEGORIES.map(h => 
                    <tr key={h.class} className="range-filter-table-item">
                        <td className="range-filter-select"><div></div></td>
                        <td>{h.class}</td>
                        <td>{h.percent}</td>
                    </tr>
                )}
                <tr><th className="hand-class-label" colSpan={3}>DRAW HANDS</th></tr>
                {DRAW_HAND_CATEGORIES.map(h => 
                    <tr key={h.class} className="range-filter-table-item">
                        <td className="range-filter-select"><div></div></td>
                        <td>{h.class}</td>
                        <td>{h.percent}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    </RangeFilterStyle>
);

export default RangeFilter;