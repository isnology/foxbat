class ApplicationController < ActionController::Base
  protect_from_forgery unless: -> { request.format.json? }
  respond_to :json
  
  protected

    def formats(data)
      data.map { |dta| format(dta) }
    end
end
