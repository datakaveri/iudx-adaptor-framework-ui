import environment from '../../environments';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';
import RulesModel from './models/RuleModel';

export default class RulesEngineEffect {
  static async getRules(adaptorId) {
    const response = await HttpUtility.get(
      `${environment.BACKEND_URL}/adaptor/${adaptorId}/rules`,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    if (response.data && response.data.rules) {
      return response.data.rules.map(data => new RulesModel(data));
    }
    return [];
  }

  static async submitRule(ruleConfig) {
    const response = await HttpUtility.post(
      `${environment.BACKEND_URL}/rule`,
      ruleConfig,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
  }

  static async deleteRule(adaptorId, ruleId) {
    const response = await HttpUtility.delete(
      `${environment.BACKEND_URL}/adaptor/${adaptorId}/rules/${ruleId}`,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
  }
}
