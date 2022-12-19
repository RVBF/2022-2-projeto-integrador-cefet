<?php

namespace App;
class Request
{

	protected $files;
	protected $base;
	protected $uri;
	protected $method;
	protected $protocol;
	protected $data = [];

	public function __construct()
	{
		$this->base = $_SERVER['REQUEST_URI'];
		$this->uri  = $_REQUEST['uri'] ?? '/';
		$this->method = strtolower($_SERVER['REQUEST_METHOD']);
		$this->protocol = isset($_SERVER["HTTPS"]) ? 'https' : 'http';
		$this->setData();

		if (count($_FILES) > 0) {
			$this->setFiles();
		}
	}

	protected function setData()
	{
		switch ($this->method) {
			case 'post':
				$this->data = json_decode(file_get_contents('php://input'), true);
				break;
			case 'get':
				$this->data = json_decode(file_get_contents('php://input'), true);
				break;
			case 'head':
				$this->data = json_decode(file_get_contents('php://input'), true);
				break;
			case 'put':
				$this->data = json_decode(file_get_contents('php://input'), true);
				break;
			case 'delete':
				$this->data = json_decode(file_get_contents('php://input'), true);
				break;
			case 'options':
				$this->data = json_decode(file_get_contents('php://input'), true);
				break;
		}
	}

	protected function setFiles()
	{
		foreach ($_FILES as $key => $value) {
			$this->files[$key] = $value;
		}
	}

	public function base()
	{
		return $this->base;
	}

	public function getMethod()
	{

		return $this->method;
	}

	public function uri()
	{
		return $this->uri;
	}

	public function all()
	{
		return $this->data;
	}

	public function __isset($key)
	{
		return isset($this->data[$key]);
	}

	public function __get($key)
	{
		if (isset($this->data[$key])) {
			return $this->data[$key];
		}
	}

	public function hasFile($key)
	{

		return isset($this->files[$key]);
	}

	public function file($key)
	{

		if (isset($this->files[$key])) {
			return $this->files[$key];
		}
	}
}
