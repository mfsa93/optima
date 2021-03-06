<?php namespace Optima;

use Validator;

class Company extends \Eloquent {

	protected $fillable = [
		'name',
		'nit',
		'sector',
		'city',
		'address',
		'phone',
		'type',
		'web',
		'comment',
        'client_type'
	];

	public $rules = [
		'name' => 'required',
		'nit' => 'min:9',
		'phone' => 'min:7',
	];

	public function contacts()
	{
		return $this->hasMany('Optima\\Contact');
	}

	public function quotations()
	{
		return $this->hasMany('Optima\\Quotation');
	}

	public static function search($query)
	{
		return self::with('contacts')
							->where("name", "LIKE", "%$query%")
							->orWhere("nit", "LIKE", "$query%")
							->take(50)->orderBy('id', 'DESC')->get();
	}

	public static function takeAndSkip($take = 10, $skip = 0)
	{
		return self::with('contacts')
								->orderBy('id', 'DESC')
								->take($take)->skip($skip)->get();
	}

	public static function store($data)
	{
		$validator = Validator::make($data, self::$rules);

		if ($validator->passes()) {
			$model = self::create($data);
			return $model;
		}

		return $validator->messages();
	}

	public static function find_and_update($id = null, $data)
	{
		$validator = Validator::make($data, self::$rules);

		if ($validator->passes()) {
			$model = self::find($id);
			$model->update($data);
			return $model;
		}

		return $validator->messages();
	}

	public function with_contacts($id)
	{
		return self::find($id)->contacts;
	}
}
