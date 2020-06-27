import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core';
import { ApiResponseCompany } from 'api/apiResponse';
import { CmpLink } from 'components/CmpLink';

export const CmpLineListPanel: React.FC<{
  lines: ApiResponseCompany['lines'];
}> = ({ lines }) => (
  <ExpansionPanel>
    <ExpansionPanelSummary>路線一覧</ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography>
        {lines.map((line, i) => (
          <CmpLink to={`/line/${line.lineId}`} key={i}>
            {line.lineNameAlias}
          </CmpLink>
        ))}
      </Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);
