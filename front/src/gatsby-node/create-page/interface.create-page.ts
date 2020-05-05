import { Connection } from 'typeorm';
import { Actions } from 'gatsby';

export interface InterfaceCreatePageFunc {
  (connection: Connection, actions: Actions): Promise<void>;
}
